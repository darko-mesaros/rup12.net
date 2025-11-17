---
layout: ../../layouts/post.astro
title: "Learning Rust: Custom Error types that actually work!"
author: "Darko"
description: "Tired of writing the same verbose error handling boilerplate in your Axum handlers? Me too! 🙄 By creating a custom `AppError` newtype that wraps `anyhow::Error` and implements `IntoResponse` + `From<E>`, you can ditch all those ugly match statements and embrace the beautiful `?` operator."
excerpt: "We are taking advantage of a *very* powerful crate here, [anyhow](https://crates.io/crates/anyhow). Which allows us to work with errors in Rust way more efficiently. In our case we are using it's popularity and other crates ability to convert into this Error type."
tags: [rust, axum, anyhow, errors, types, newtype, development]
image:
  src: /post-content/learning-rust-custom-errors/header.jpg
  alt:
pubDate: 2025-11-16
isPinned: true
---
> **TL;DR:** [GITHUB REPO](https://github.com/darko-mesaros/webone). Tired of writing the same verbose error handling boilerplate in your Axum handlers? Me too! 🙄 By creating a custom `AppError` newtype that wraps `anyhow::Error` and implements `IntoResponse` + `From<E>`, you can ditch all those ugly match statements and embrace the beautiful `?` operator. Your handler functions go from messy error-matching shenanigans to clean, readable code that automatically converts any error into proper HTTP responses. It's like magic, but with more crabs! 🦀 

---

Recently I've been digging a lot into the [axum](https://crates.io/crates/axum) crate for any of my Rust web projects. There are plenty of options out there for Rust web applications, but it seems that [we](https://www.arewewebyet.org/) have all settled on **Axum** as the go to crate. Before you even start reading this, if you have not checked it out yet - *do so now* ... I'll wait. 

Okay, you're back! Love it? YES! 🥳 Now, let's talk about a learning project I am working on. Ever since I've discovered [htmx](https://htmx.org/) I've been immersing myself in the world of web development with [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) as my priority. Just the neatness of using hypermedia gives me a rush, and helps me with all that [JavaScript fatigue](https://medium.com/@ericclemmons/javascript-fatigue-48d4011b6fc4). I do suggest you go and give [hypermedia systems](https://hypermedia.systems/) a read, a thing I have been doing over the past couple of weeks.

So, in the spirit of this book, I was following along with building some hypermedia driven system. But instead of using Python and Flask as stated in the book, I've opted to put my crab hat on, and do it in Rust. Like the big boy I am. In this post I wont explain how I did that (link to a post from the future will go here), but rather explain how I used the amazing features of Rust to eliminate a lot of boilerplate code on my side.

## Errors Errors

In order to be a good web builder, you want to make sure to return the proper HTTP status codes. (I'm looking at you `200 OK` with an error message). So in my [handler](https://docs.rs/axum/0.8.7/axum/#handlers) functions I make sure to explicitly return the Status code as part of my return tuple. Something like so:

```rust
Ok((StatusCode::OK, Html("<h1>Hello World</h1>")))
// Or an Error:
Err((StatusCode::INTERNAL_SERVER_ERROR, format!("Error processing hello world")))
```

This would signal back to the user (and axum) that the request was either `200 OK`, and here is the HTML, or `500 Internal Server Error` and an angry string. Nifty!

With the glory of Rust's [Result](https://doc.rust-lang.org/rust-by-example/error/result.html) enum, we are equipped to handle any errors our back end may throw at us. So, I just `match` on call that can fail, and return something back depending on that `Result`.
In practice, say in this handler function that finds a `Contact` by its ID in the database, it would look something like this:

```rust
#[axum::debug_handler]
async fn get_edit_contact(
    State(state): State<AppState>,
    Path(id): Path<i64>,
    // The function signature tells us what we expect back
) -> Result<(StatusCode, Html<String>), (StatusCode, String)> {

    // This call can fail so let's match its Result
    let contact = match Contact::find_by_id(&state.db, id).await {
        // We're good return back the `Contact` into the `contact` variable
        Ok(contact) => contact, 
        // We're NOT good, return the tuple with a status code of 500
        Err(e) => {
            return Err(
                (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to find contact: {e}")
                )
            )
        }
    };

    let edit_template = EditContactTemplate { contact };

    // This can also fail, but we dont need to store it into a variable,
    // we just need to return.
    match edit_template.render() {
        // Looks good, return the HTML and 200 OK
        Ok(html) => Ok((StatusCode::OK, Html(html))),
        // Again 500 Bad, be angry here
        Err(e) => {
            Err(
                (
                StatusCode::INTERNAL_SERVER_ERROR,
                format!("Failed to render template: {e}")
                )
            )
        }
    }
}
```

That is a *lot* of boilerplate code. While I do enjoy the verbosity of Rust (makes me feel all safe and cozy), this gets real old real fast. Especially when you have multiple handler functions, that invoke multiple different calls that can fail. Let's bring in another amazing feature of rust the *newtype pattern*, and simplify this 👏

## Building my own Error type

I wont go too much into newtypes, as there is an [excellent guide](https://www.howtocodeit.com/articles/ultimate-guide-rust-newtypes) that I encourage all of you to read. Simply put, they are thin wrappers that allow you to extend functionality of existing Types not native to your crate. And I am gonna use it to extend the implement the `IntoResponse` trait into a type I dubbed `AppError`. And then allow it (what ever the Error is) to be converted into [anyhow::Error](https://crates.io/crates/anyhow).

Let's first create this wrapper newtype:
```rust
pub struct AppError(anyhow::Error);
```
Here I am wrapping `anyhow::Error` into a new type called `AppError`. I could do the same for any other type, and just create a wrapper around it (ie. a `Vec<T>` wrapper: `struct Wrapper(Vec<T>)`). Now comes the fun part, implementing certain traits.

To implement the `IntoResponse` trait from [axum](https://docs.rs/axum/latest/axum/response/trait.IntoResponse.html) into this new type, we only need to implement the `into_response` function, which needs to return a `Response<Body>` type. Let's look at some code:
```rust
impl IntoResponse for AppError { // 1
    fn into_response(self) -> Response { // 2
        (StatusCode::INTERNAL_SERVER_ERROR, self.0.to_string()).into_response() // 3 
    }
}
```
And just like that we've implemented our own way of returning an error response from a handler function. Let me explain the code a bit:
1) The implementation block for `IntoResponse` for `AppError`
2) This is the only function needed for `IntoResponse` and we are simply returning a `Response` from the axum crate
3) We just return a tuple of a `StatusCode` and a `String` coming from element 0 of the `AppError` struct. Oh, and convert all that into a `Response`

Here is a bit more **complicated** version of the same code, this one uses a templating engine to return some nicely formatted web pages. This version just expands the above, but should demonstrate that this all works really nicely with the rest of your codebase.
```rust
impl IntoResponse for AppError {
    fn into_response(self) -> axum::response::Response {
        // Returning a HTML page for an error
        let template = Error5xxTemplate { // 1
            // Select element 0, as that is our anyhow::Error string and convert it so it works with our template
            error: self.0.to_string(),
        };
        match template.render() { // 2
            // If the template render is successful, return the HTML page with the error
            Ok(html) => (StatusCode::INTERNAL_SERVER_ERROR, Html(html)).into_response(),
            // The render has failed catastrophically - just return some string
            Err(_) => (StatusCode::INTERNAL_SERVER_ERROR, "Internal Server Error").into_response(),
        }
    }
}
```
Okay, there is a lot more going on here. Most of it is the same as before, but let me break it down:

1) Somewhere in my code base I have a `Error5xxTemplate` struct that I use with the [askama](https://crates.io/crates/askama) templating crate
2) I make sure the template renders okay, if so - return the 5xx error page, if not I just give a `500` error and the string back.

![Absolutely gorgeous error page](/post-content/learning-rust-custom-errors/error_page.png)

Now that we have an `IntoResponse` implemented. Let's give our `AppError` the ability to take errors from anywhere.

## Converting other error types

To make `AppError` a bit more flexible, I wanted to be able to automatically convert any* (*I'll come back to this in a bit) error type. Let's look at some code and make sense of it:
```rust
impl<E> From<E> for AppError // 1
where
    E: Into<anyhow::Error> // 2 
{
    fn from(err: E) -> Self { // 3
        Self(err.into())
    }
}
```
We are taking advantage of a *very* powerful crate here, [anyhow](https://crates.io/crates/anyhow). Which allows us to work with errors in Rust way more efficiently. In our case we are using it's popularity and other crates ability to convert into this Error type.

Let me explain this line by line:

1) We are implementing `From<E>` for `AppError`. By using the generic type `E` we can have a wider implementation. This would be the equivalent of `impl From<sqxl::Error> for AppError`. Which converts the `sqlx::Error` type into `AppError`
2) This is the *critical bit*, and why it actually limits us to certain errors. By having this `where` clause, we only allow the generic type `E` to be the ones that already support the `Into` trait from `anyhow::Error`. Basically limiting us to types that already support the conversion into this error type. 
3) We only need to implement the `from` function that takes an error and returns itself back. By using the support mentioned above, we can just take the error and run an `.into()` conversion.

By using this generic trait approach we are essentially creating the following Rust code:
```rust
// SQLX:
impl From<sqlx::Error> for AppError {
    fn from(err: sqlx::Error) -> Self {
        Self(err.into()) // sqlx::Error -> anyhow::Error -> AppError
    }
}
// serde_json
impl From<serde_json::Error> for AppError {
    fn from(err: serde_json::Error) -> Self {
        Self(err.into()) // serde_json::Error -> anyhow::Error -> AppError
    }
}
// reqwest
impl From<reqwest::Error> for AppError {
    fn from(err: reqwest::Error) -> Self {
        Self(err.into()) // reqwest::Error -> anyhow::Error -> AppError
    }
}
// ...
```
And so on ... You get the picture!

![Error Conversion](/post-content/learning-rust-custom-errors/error_diagram.png)

## Actual implementation

Okay, so we have our newtype `AppError`, it has all the things it needs to be converted to our Error type. How does it actually work? Well, let's go back to our `get_edit_contact` handler function from before, and see what has changed:
```rust
#[axum::debug_handler]
async fn get_edit_contact(
    State(state): State<AppState>,
    Path(id): Path<i64>,
) -> Result<(StatusCode, Html<String>), AppError> {
    let contact = Contact::find_by_id(&state.db, id).await?; // sqlx::Error -> AppError
    let edit_template = EditContactTemplate { contact };
    let html = edit_template.render()?; // askama::Error -> AppError
    Ok((StatusCode::OK, Html(html)))
}
```

Whoa, that is way tighter than before. Yes, we are using the `?` [operator](https://doc.rust-lang.org/std/result/index.html) we *propagate the errors up the call stack*. Meaning the value of the `Result` returned by both `Contact::find_by_id` and `.render()` are returned back to axum as `AppError` newtypes. 

This means we no longer have to deal with error handling within the function itself, and we are just returning the same error type back. Since it is the same error type, both function handler and axum are happy with receiving it! 🥳 Huzzah!

If you want to see the full codebase in action, you can check out my GitHub repo [here](https://github.com/darko-mesaros/webone). And please ignore the mess, this is just a learning repo! 🙏

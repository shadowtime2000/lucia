# <a href="http://lucia.js.org"><img src="https://raw.githubusercontent.com/aidenybai/lucia/master/.github/img/logo.svg" height="60" alt="Lucia Logo" aria-label="http://lucia.js.org" /></a>

### A tiny `3kb` JavaScript library for prototyping web applications.

Sometimes, all you want to do is to try and do something—No boilerplate, bundlers, or complex build processes. Lucia aims to do this, providing an augmentation layer for your logic, allowing you to build just what you need with minimal effort and time.

![TravisCI Build](https://badgen.net/travis/aidenybai/lucia?color=7460E1&labelColor=1D1E32&style=flat-square&label=build) ![Code Size](https://badgen.net/badgesize/brotli/https/unpkg.com/lucia?color=7460E1&labelColor=1D1E32&style=flat-square&label=size) ![NPM Version](https://img.shields.io/npm/v/lucia?color=7460E1&labelColor=1D1E32&style=flat-square) ![Code Coverage](https://img.shields.io/coveralls/github/aidenybai/lucia?color=7460E1&labelColor=1D1E32&style=flat-square)

[**→ Check out the Lucia Website**](https://lucia.js.org)

## Installation

Lucia is currently is installable through a CDN and also supports UMD, ES Module, and CommonJS. Put this within your `<head>` tags in HTML.

```html
<script src="https://unpkg.com/lucia"></script>
```

If you are using a module bundler like [Webpack](https://webpack.js.org/) or [Rollup](https://rollupjs.org):

<pre>
npm install <b>lucia</b>
</pre>

[**→ Learn more about installing Lucia**](https://lucia.js.org/docs/essentials/installation)

## Documentation

The Lucia docs are located at [**https://lucia.js.org**](https://lucia.js.org):

- [Introduction](https://lucia.js.org/docs/essentials/introduction)
- [Installation](https://lucia.js.org/docs/essentials/installation)
- [Examples](https://lucia.js.org/docs/essentials/examples)

[**→ Learn how the Lucia Virtual DOM works**](https://github.com/aidenybai/lucia/tree/master/src/vdom#readme)

## Example

Below is an example of a todo app in Lucia. No, your eyes aren't fooling you - it's really that simple.

```html
<div l-state="{ value: '', todo: [] }">
  <!-- two-way-binds `value` prop to value -->
  <input l-model="this.value" />
  <!-- captures click event, pushing current `value` to `todo` -->
  <button l-on:click="this.todo.push(this.value)">Create</button>
  <!-- joins array together -->
  <ul l-for="task in this.todo">
    <li l-text="this.task"></li>
  </ul>
</div>
```

[**→ View the live Codepen example**](https://codepen.io/aidenybai/pen/JjRrwjN) | [**→ View more examples**](https://lucia.js.org/docs/essentials/examples)

## Similar Projects

It should be noted that Lucia should not be implemented in all use cases. Lucia aims to tackle projects that need to be quickly implemented. This means if you're looking for something production-ready and has a API similar to Lucia, check these projects out!

- [Vue](https://github.com/vuejs/vue) - A progressive, incrementally-adoptable JavaScript framework for building UI on the web.
- [Alpine](https://github.com/alpinejs/alpine) - A rugged, minimal framework for composing JavaScript behavior in your markup.
- [Remake](https://github.com/remake/remake-cli) - Create interactive web apps with just HTML.
- [Stimulus](https://github.com/stimulusjs/stimulus) - A modest JavaScript framework for the HTML you already have.
- [Mavo](https://github.com/mavoweb/mavo) - Create web applications entirely by writing HTML and CSS!
- [htmx](https://github.com/bigskysoftware/htmx) - High power tools for HTML.

## Contributing

Refer to the [CONTRIBUTING.md](https://github.com/aidenybai/lucia/blob/master/.github/CONTRIBUTING.md) file for instructions. Below are some of the projects under `lucialand`:

- [Luciascript](https://github.com/lucialand/luciascript) - Hastscript like utility to create HTML strings
- [Luciex](https://github.com/lucialand/luciex) - Simplistic state management

<a href="https://github.com/aidenybai/lucia/graphs/contributors"><img src="https://opencollective.com/lucialand/contributors.svg?width=890" /></a>

## 📑 License

Lucia is [MIT licensed](LICENSE.md).

＼＿ﾍ(◕‿◕ ✰)

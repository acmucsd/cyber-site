---
published: 2024-12-13
title: How to create a page on the ACM Cyber website
description: A guide for ACM Cyber board members on how to create resources pages.
unlisted: true
---

Each page is a [Markdown](https://en.wikipedia.org/wiki/Markdown) file in the [posts/ folder](https://github.com/acmucsd/cyber-site/tree/main/posts) in the [ACM Cyber website repo](https://github.com/acmucsd/cyber-site). The file name corresponds to the URL of the page on the website. Feel free to look at the other files and see how the files correspond to pages on the website.

To create a new page, duplicate one of the existing files and change whatever you want.

Below is more in-depth documentation that you don't need to read unless something goes wrong.

## Header

Each Markdown file starts with a _header_, which looks like this. Note that it is starts and ends with a `---` that separates it from the content of the page.

```yml
---
published: 2024-11-24
title: How to make a lockpick in DIB Makerspace
description: howdy lmao
---
```

- **published**: This should be a date in the [`YYYY-MM-DD` format](https://en.wikipedia.org/wiki/ISO_8601#Dates). The month and date should be padded with zeroes, so January 1, 2025 should become `2025-01-01`.

  This represents when the page was made public. The [Resources page](/resources) uses this to show recently published posts. For [internal pages](#internal-pages), this represents when the page was created.

  If the page is still a draft, you can omit this field to prevent the page from being published. If you want keep the page unlisted, you should move the page to [posts/internal/](https://github.com/acmucsd/cyber-site/tree/main/posts/internal) to make it clear it's not meant to be published.

- **title**: This is the title of the page 🤓. It shows at the top of the page, in the tab title, and in website previews.

  This means that you don't need to create your own title heading in the page content. Also, it would be preferred if you only used heading levels 2 and below for the rest of the page. This way, the page title can be heading level 1

  ```md
  # Don't use this. It is used for the page title.

  ## First heading

  ### Sub-heading

  #### And so on...
  ```

- **description**: The description of the page 🙄. It doesn't show on the web page, but it is used in website previews (see below) and the "recently published" section on the [Resources page](/resources).

  <img src="/assets/posts/discord-web-preview.png" alt="Discord web preview showing the page title and description" width="437">

## Internal pages

Internal pages are pages that are intentionally left unlisted. "Unlisted" in this sense means that:

- We request search engines not to include internal pages in search results.

  ```sh
  # robots.txt
  User-agent: *
  Disallow: /internal/
  ```

- Internal pages with a `published` date will not be listed under "recently published" on the [Resources page](/resources).

However, keep in mind that internal pages are still publicly accessible and searchable in the [GitHub repo](https://github.com/acmucsd/cyber-site). Once found, they can be linked to by anyone. Any content that should be kept within ACM Board should be put on [Notion](https://acmurl.com/notion). Unlisting a page is intended to make it easier for members to find what they're looking for.

To create an internal page, put the page under [posts/internal/](https://github.com/acmucsd/cyber-site/tree/main/posts/internal).

## Known Markdown quirks

- You can link to other Markdown pages by their Markdown file names. For example, this:

  ```md
  [Test](./test.md)
  ```

  becomes this:

  > [Test](./test.md)

- However, this doesn't work for images. You have to put images into the public/ folder, then use the URL of the image in the website.

  For example, if I put an image at public/assets/my-image.png, then the Markdown should look like this:

  ```md
  ![My image](/assets/my-image.png)
  ```

  This is because the image is hosted at `https://cyber.acmucsd.com/assets/my-image.png` (without `public`).

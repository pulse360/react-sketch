# react-sketch

A Sketch tool for React based applications, backed-up by [FabricJS](http://fabricjs.com/)

## Development

- You'll probably need to install the following

  ```sh
  sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev xdg-utils --fix-missing
  ```

- And Update `.bashrc` or `.zshrc` (this might not be necessary in a unix SO, test it without this)

  ```sh
   export DISPLAY=$(awk '/nameserver / {print $2; exit}' /etc/resolv.conf 2>/dev/null):0
   export LIBGL_ALWAYS_INDIRECT=1
  ```

Then install the dependencies (Tested with node versions 10,12)

```sh
yarn
```

> ### Warning
>
> If it fails with a bunch of `node-gyp` (in the Canvas build) it will probably still work. Weird stuff

> This comes from the old docs, didn't use it... yet.
> In order to build from source, read the [relevant instructions](http://fabricjs.com/fabric-intro-part-4#node) first.


### Development Builds

There's 3 commands currently:

- `yarn start` will make a hot-reloading version, that will be accesible in [http://localhost:23000](http://localhost:23000)
- `yarn build` is the production build, you can link it to your project to try it out
- `yarn build:light` is the human readable build.... currently not working!
- EXTRA: You can check the original version demo [here](http://tbolis.github.io/showcase/react-sketch/)

## Issues

See the original repo: [here](https://github.com/tbolis/react-sketch/issues)

## License

MIT, do remember to add a reference if you find it useful :)

[warning-image]: /docs/img/warning.png
[idea-image]: /docs/img/idea.png
[github-image]: https://img.shields.io/github/release/tbolis/react-sketch.svg
[github-url]: https://github.com/tbolis/react-sketch/releases
[npm-image]: https://img.shields.io/npm/v/react-sketch.svg
[npm-url]: https://www.npmjs.com/package/react-sketch
[downloads-image]: https://img.shields.io/npm/dm/react-sketch.svg
[downloads-url]: https://www.npmjs.com/package/react-sketch
[travis-image]: https://img.shields.io/travis/tbolis/react-sketch.svg
[travis-url]: https://travis-ci.org/tbolis/react-sketch

# OLD DOCS - OLD DOCS - Maybe Outdated - OLD DOCS - OLD DOCS

## Usage

Import the relevant SketchField component and use it, you can find more on the examples folder of the project

```javascript
import { SketchField, Tools } from 'react-sketch'

class SketchFieldDemo extends React.Component {
  render() {
    return <SketchField width='1024px' height='768px' tool={Tools.Pencil} lineColor='black' lineWidth={3} />
  }
}
```

Configuration Options

| Option           | Type                 | Default        | Description                                                                                                                                  |
| ---------------- | -------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| tool             | Enumeration (string) | pencil         | The tool to use, can be select, pencil, circle, rectangle, pan                                                                               |
| lineColor        | String               | black          | The color of the line                                                                                                                        |
| lineWidth        | Number               | 1              | The width of the line                                                                                                                        |
| fillColor        | String               | transparent    | The fill color (hex format) of the shape when applicable (e.g. circle)                                                                       |
| backgroundColor  | String               | transparent    | The the background color of the sketch in hex or rgba                                                                                        |
| undoSteps        | Number               | 15             | number of undo/redo steps to maintain                                                                                                        |
| imageFormat      | String               | png            | image format when calling toDataURL, can be png or jpeg                                                                                      |
| width            | Number               | No Value(null) | Set/control the canvas width, if left empty the sketch will scale to parent element                                                          |
| height           | Number               | 512            | Set/control the canvas height, if left empty the sketch will take a reasonable default height                                                |
| value            | JSON                 |                | Property to utilize and handle the sketch data as controlled component                                                                       |
| defaultValue     | JSON                 |                | Default initial data, to load. If value is set then value will be loaded instead                                                             |
| widthCorrection  | Number               | 2              | Specify some width correction which will be applied on resize of canvas, this will help to correct some possible border on the canvas style  |
| heightCorrection | Number               | 0              | Specify some height correction which will be applied on resize of canvas, this will help to correct some possible border on the canvas style |

Available tools

| Tool      | Description                                                                                                                                                                              |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pencil    | Free drawing pencil                                                                                                                                                                      |
| Line      | Gives you the ability to draw lines                                                                                                                                                      |
| Rectangle | Create rectangles                                                                                                                                                                        |
| Circle    | Create circles                                                                                                                                                                           |
| Rectangle | Create Rectangles                                                                                                                                                                        |
| Select    | Disables drawing and gives you the ability to modify existing elements in the canvas                                                                                                     |
| Pan       | Disables drawing and gives you the ability to move the complete canvas at will, useful to adjust the canvas when zooming in or out (thank you [wmaillard](https://github.com/wmaillard)) |

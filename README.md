# react-sketch

A Sketch tool for React based applications, backed-up by [FabricJS](http://fabricjs.com/)

## Development

- You'll probably need to install the following

  ```sh
  sudo apt install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev \
                 libgif-dev librsvg2-dev xdg-utils --fix-missing
  ```

- And Update `.bashrc` or `.zshrc` (this might not be necessary in a unix SO, you might be able to skip this)

  ```sh
   export DISPLAY=$(awk '/nameserver / {print $2; exit}' /etc/resolv.conf 2>/dev/null):0
   export LIBGL_ALWAYS_INDIRECT=1
  ```

- And finally, install the dependencies (we use yarn, tested with node versions 10+) to be good to go.

> ### Warning
>
> When installing the dependencies and building, if it fails with a bunch of `node-gyp` errors (in the Canvas build) it will probably still work. Weird stuff


### Development Builds

There's 3 commands currently:

- `yarn start` will make a hot-reloading version, that will be accesible in [http://localhost:23000](http://localhost:23000)
- `yarn build` is the production build, you can link it to your project (`yarn link`) to try it out
- `yarn build:light` is the human readable build.... currently not working!
- EXTRA: You can check the original version demo [here](http://tbolis.github.io/showcase/react-sketch/)


## Issues

See the original repo: [here](https://github.com/tbolis/react-sketch/issues)

## License

MIT, do remember to add a reference if you find it useful :)

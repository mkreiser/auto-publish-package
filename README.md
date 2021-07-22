# auto-publish-package

A simple, lightweight tool to automatically publish an npm package if the latest version has not been published already. This is very useful for CI/CD.

This tool assumes:

1. `npm` is installed globally
2. `npm` is correctly configured an npm user (https://docs.npmjs.com/cli/adduser) that is authorized to publish the package
3. `npm` is correctly configured to publish to the correct registry via `.npmrc` (globally and/or locally) and/or `publishRegistry` in `package.json`.
4. `auto-publish-package` is executed in the directory of the package you want to publish.

## Installation

```bash
npm install auto-publish-package
```

## License

MIT

"use strict";

hexo.extend.generator.register('npmpush', function (locals) {
  // Object
  return {
    path: '/.github/workflows/autopublish.yml',
    data: "name: Node.js Package\n  # \u76D1\u6D4B\u5206\u652F\uFF0C2020\u5E7410\u6708\u540Egithub\u65B0\u5EFA\u4ED3\u5E93\u9ED8\u8BA4\u5206\u652F\u6539\u4E3Amain\uFF0C\u8BB0\u5F97\u66F4\u6539\n  on:\n    push:\n      branches:\n        - master\n  \n  jobs:\n    publish-npm:\n      runs-on: ubuntu-latest\n      steps:\n        - uses: actions/checkout@v2\n        - uses: actions/setup-node@v1\n          with:\n            node-version: \"20.x\"\n            registry-url: https://registry.npmjs.org/\n        - run: npm publish\n          env:\n            NODE_AUTH_TOKEN: " + '${{secrets.npm_token}}'
  };
});
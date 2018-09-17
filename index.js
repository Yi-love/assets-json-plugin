class AssetsJsonPlugin {
  constructor(options) {
    this.options = options || {};//filename,hash
  }

  apply(compiler) {
    const self = this;
    compiler.hooks.emit.tapAsync('AssetsJsonPlugin', (compilation, callback) => {
        const chunkOnlyConfig = {
            assets: false,
            cached: false,
            children: false,
            chunks: true,
            chunkModules: false,
            chunkOrigins: false,
            errorDetails: false,
            hash: false,
            modules: false,
            reasons: false,
            source: false,
            timings: false,
            version: false
        };
        const chunks = compilation.getStats().toJson(chunkOnlyConfig).chunks;

        const assets = {
            hash: compilation.hash,
            publicPath: compilation.outputOptions.publicPath || '',
            entry:{}
        };

        for (let i = 0; i < chunks.length; i++) {
            const chunk = chunks[i];
            const chunkName = chunk.names[0];
            
            assets.entry[chunkName] = {entry:chunk.entry};

            let chunkFiles = [].concat(chunk.files);
            
            const js = chunkFiles.find(chunkFile => /.js($|\?)/.test(chunkFile));
            if ( js ) {
                assets.entry[chunkName].js = js;
                assets.entry[chunkName].hash = chunk.hash;
            }
            //depend css
            assets.entry[chunkName].css = chunkFiles.filter(chunkFile => /.css($|\?)/.test(chunkFile));
            //depend
            assets.entry[chunkName].siblings = chunk.siblings;
        }

        compilation.assets[self.options.filename || 'assets' + (self.options.hash ? '-' + compilation.hash : '') + '.json'] = {
            source() {
                return JSON.stringify(assets);
            },
            size() {
                return chunks.length;
            }
        };

        callback();
    });
  }
}

module.exports = AssetsJsonPlugin;
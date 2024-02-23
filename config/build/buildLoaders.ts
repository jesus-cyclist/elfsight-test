import { ModuleOptions } from 'webpack'
import { buildBabelLoader } from './babel/buildBabelLoader'
import type { TBuildOptions } from './types/types'

export function buildLoaders(options: TBuildOptions): ModuleOptions['rules'] {
    const svgrLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true
                                }
                            }
                        ]
                    }
                }
            }
        ]
    }

    const assetLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
    }

    const cssLoader = {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
    }

    const babelLoader = buildBabelLoader(options)

    return [assetLoader, cssLoader, svgrLoader, babelLoader]
}

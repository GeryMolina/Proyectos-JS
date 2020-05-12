const path = require('path'); //se trae paquete disponible desde node 
//Webpack tiene una configuración interna pero al crear nuestra propia configuracion tenemos mas 
//libertad para utilizar muchos mas pluggins y entries
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        index: './src/js/index.js'
    },//Se pueden crear distintos puntos de entrada con un arreglo []
    output: {
        filename: '[name].bundle.js', //nombre de archivo 
        path: path.join(__dirname, '/dist')//nombre de carpeta// Ejecutamos en consola node_modules/.bin/webpack 
        //Para no ejecutar el comando tan largo constantemente, podemos en el script del package.json crear uno
        //que será ejecutable con npm, en el script creo la instruccion ejecutar("build" : "webpack --mode development")
        // Se establece el mode pq el ejecutarlo solo nos reclama un warning que falta especificar "production".
        //El comando se corre con "npm run build"
    },
    devServer :{
        contentBase : path.join(__dirname, 'dist'), //carpeta de donde se van a servir los archivos
        compress: true,
        port: 9000  
    },
    module: {
        rules:[
            {
                //Acá creamos los loader y señalamos las reglas a seguir
                test: /\.js$/, //que lea todos los archivos JS
                exclude: /node_modules/, // que nos excluya los que estan dentro del paquete node-modules
                use: {
                    loader: 'babel-loader' //se enlaza con el paquete de babel ya instalado y configurado
                    //Lo que hace babel es transpilar codigo moderno a un formato anterior, para que sea soportado por navegadores
                } 
                //Para Ejecutarlo se crea otro script ( "watch":"webpack --w --mode development") se corre con npm run watch
                //Lo que hace watch es estar al tanto de los cambios ocurridos dentro de los JS, y recarga automaticamente.
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]  
            },
            {
                test: /\.scss$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'}
                ]  
            }
        ]
    },
    optimization: { //Con esto podemos crear un solo archivo que contenga todo el codigo de webpack y dejar mucho mas ligero el codigo, ya que no se repite en cada archivo
        splitChunks :{
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/, //Expresion regular para incluir todo lo que está dentro de node modules
                    name: 'common',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            title: 'Login'
        }),
        new HtmlWebpackPlugin({
            filename: 'nosotros.html',
            template: 'src/nosotros.html',
            title: 'Nosotros'
        })
    ]

}
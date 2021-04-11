import Document, { Html, Head, Main, NextScript } from 'next/document';

class CustomeDoc extends Document {
  render() {
    return (
      <Html lang='ar'>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomeDoc;

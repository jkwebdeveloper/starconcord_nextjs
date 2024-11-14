// const { default: Head } = require("next/head");
import Head from "next/head";



function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/6735c3234304e3196ae274fe/1icl04gt2";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
     
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

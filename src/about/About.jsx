import Header from "../Header";

const styles = {
  aboutContainer: {
    backdropFilter: "blur(10px)",
    borderRadius: "10px"
  }
};

function About() {
  return (
    <>
      <Header />
      <div className="about secondary-container padding" style={styles.aboutContainer}>
        <p className="description">
          A simple score keeper app for forgetful tennis players!
        </p>

        <p className="description">Built with React and BeerCSS.</p>

        <p>Icons:</p>
        <p><a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> 
        &nbsp;from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>

        <a href="https://www.freepik.com/icon/tennis_9012192#fromView=search&page=1&position=43&uuid=6655a22b-39e8-4616-a958-4ab9d5ebe7ac">Tennis Icon</a>

        <p>Fonts: <a href="https://fonts.google.com/specimen/Roboto">Roboto</a></p>
      </div>
    </>
  )
}

export default About;
function About() {
  return (
    <div className="about secondary-container padding" style={{backdropFilter: "blur(10px)", borderRadius: "10px"}}>
      <p className="description">
        A simple score keeper app for forgetful tennis players!
      </p>

      <p className="description">Built with React and BeerCSS.</p>

      <p>Icons made by:</p>
      <p><a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> <a href="https://www.flaticon.com/authors/vectors-market" title="Vectors Market">Vectors Market</a> 
      &nbsp;from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
      <p>Fonts:</p>
      <p><a href="https://fonts.google.com/specimen/Roboto">Roboto</a></p>
    </div>
  )
}

export default About;
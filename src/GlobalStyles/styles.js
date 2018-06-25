export default`
  * {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: 'Open Sans', sans-serif;
  }
  .wrapper {
    position: absolute;
    width: 100%;
    min-height: 100%;
    padding: 10px;
    max-width: 1000px;
  }
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .disabled {
    pointer-events: none;
    background-color: gray;
  }
  
  .h-float-left {
    float: left;
  }
  
  .h-float-right {
    float: right;
  }

  .h-margin-v-tight {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  .h-margin-b-tight {
    margin-bottom: 10px;
  }
  .h-font-style-bold {
    font-weight: bold;
  }
`;

export function SliderMy({ percents }) {
    const paragraphStyle = {
      width: percents + "%",
    };
    return (
      <div className="slide">
        <p className="first" style={paragraphStyle}>
          {" "}
          <span>{percents + "%"}</span>
        </p>
        {/* <p className="second">
          <span>{percents + "%"}</span>
        </p> */}
      </div>
    );
  }
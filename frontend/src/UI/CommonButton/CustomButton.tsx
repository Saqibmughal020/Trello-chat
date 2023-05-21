import "./CustomButton.scss";

const CustomButton = (props: any) => {
  const buttonHandler = () => {
    props.buttonHandler();
  };

  return (
    <button
      className={`custom-button-common cursor-pointer font-family-poppins font-weight-500`}
      onClick={buttonHandler}
      style={{
        width: props.btnWidth ? props.btnWidth : "136px",
        background: props.backGround, color: props.textColor
      }}
      type={props.type}
    >
      {props.arrow && (
        <div id="arrow_1" className="arrow-wrapper">
          <div className="arrow arrow--left">
            <span></span>
          </div>
        </div>
      )}

      {props.name}
    </button>
  );
};

export default CustomButton;

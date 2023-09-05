import "./index.css";
import PDF from "../../Assets/Navigation/navigation.png";
import $ from "jquery";

const Navigation = () => {

    const handleCloseNavigation = () => {
        $("#navigation-container").animate({
            scale: "0"
        }, 400);
    }
    return (
        <>
            <div id="navigation-container">
                <div className="close-navigation">
                    <h1 onClick={handleCloseNavigation}> Exit </h1>
                </div>
                <div className="navigation-description">
                    <h1> Scroll down the World+ map to find out which stage you are on. </h1>
                    <p> hint: <span style={{color: "#80FF44"}}>green</span> is the beginning, <span style={{color: "#004DFF"}}>blue</span> is the middle, and <span style={{color: "#FF4500"}}>red</span> is the end.</p>
                </div>
                <img src={PDF} />
            </div>
        </>
    )
}

export default Navigation;
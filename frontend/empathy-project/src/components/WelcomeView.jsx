import Button from 'react-bootstrap/Button'
import "../App.css";

const WelcomeView = (props) => {

    return (
        <div className="d-grid">
            <Button variant="primary" size="lg">
                Play
            </Button>
            <Button variant="secondary" size="lg">
                Instructions
            </Button>
            <Button variant="secondary" size="lg">
                About
            </Button>
        </div>
    )


}
export default WelcomeView;

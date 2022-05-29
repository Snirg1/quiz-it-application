import Button from 'react-bootstrap/Button'


const WelcomeView = (props) => {

    return (
        <div className="container bg-light">
            <div className="col-md-12 text-center">
                <Button variant="primary" size="lg" disabled>
                    Play
                </Button>{' '}
                <Button variant="secondary" size="lg" disabled>
                    Instructions
                </Button>{' '}
                <Button href="#" variant="secondary" size="lg" disabled>
                    About
                </Button>
            </div>
        </div>
    )


}
export default WelcomeView;

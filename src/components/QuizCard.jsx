import Card from "antd/es/card/Card"

export const QuizCard = ({ content, image, onClick, questionNumber }) => {
    const handleOptionClick = () => {
        onClick(questionNumber, content);
    };

    return (
        <Card
            cover={image ? <img alt="example" src={image} /> : ''}
            className="myCard"
            bordered={false}
            onClick={handleOptionClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="card_content">{content}</div>
        </Card>
    );
};

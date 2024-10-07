import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import Details from "./Details/Details";
import { ReactComponent as ArrowIcon } from "../Images/ArrowIcon.svg";
import "./NewsItem.css";

function NewsItem({ imageUrl, alt, description, title, channel, published, urlNews }) {
  return (
    <Card className="card">
      <Card.Img className="card-img" variant="top" src={imageUrl} alt={alt} />
      <Card.Body>
        <Card.Title className="card-title">{title}</Card.Title>
        <Card.Text className="card-description">{description}</Card.Text>
        <Details channel={channel} published={published} />
        <Button className="card-btn" href={urlNews} target="_blank">
          Read more 
        </Button>
      </Card.Body>
    </Card>
  );
}

NewsItem.propTypes = {
  imageUrl: PropTypes.string,
  alt: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  channel: PropTypes.string,
  published: PropTypes.string,
  urlNews: PropTypes.string,
};

export default NewsItem;

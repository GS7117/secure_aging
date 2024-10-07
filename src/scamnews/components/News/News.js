import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import NullImage from "../../components/Images/nullImage.png";
import SkeletonCard from "./SkeletonCard";
import NewsItem from "../NewsItem/NewsItem";
import { v4 as uuidv4 } from "uuid";
import { Col, Row } from "react-bootstrap";
import { header } from "../../config/config";
import { endpointPath } from "../../config/api";
import { Container, Header, card } from "./index";
import ScamNewsNavBar from "../ScamNewsNavBar/ScamNewsNavBar"; 
import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Footer";

function News(props) {
  const { newscategory, country } = props;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const category = newscategory;
  const title = capitalize(category);
  document.title = `${title} - News`;

  const updatenews = async () => {
    try {
      setLoading(true);
      const apiUrl = endpointPath(country, category);
      console.log("API URL:", apiUrl); // 调试用

      const response = await axios.get(apiUrl);
      const parsedData = response.data;
      setArticles(parsedData.articles);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    updatenews();
  }, [category, country]);

  return (
    <>
      <NavBar />
      <ScamNewsNavBar />
      {loading ? (
        <Container>
          <Row>
            {Array.from({ length: 12 }).map((_, index) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <SkeletonCard /> {/* 骨架屏代替正在加载的卡片 */}
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <>
          <Header>{header(title)}</Header>
          <Container>
            <Row>
              {articles.map((element) => (
                <Col sm={12} md={6} lg={4} xl={3} style={card} key={uuidv4()}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    published={element.publishedAt}
                    channel={element.source.name}
                    alt="News image"
                    imageUrl={element.image || NullImage}
                    urlNews={element.url}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
      <Footer />
    </>
  );
}

News.propTypes = {
  country: PropTypes.string.isRequired,
  newscategory: PropTypes.string.isRequired,
};

export default News;

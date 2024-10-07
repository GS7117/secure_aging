import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SkeletonCard from "../News/SkeletonCard";
import NewsItem from "../NewsItem/NewsItem";
import NullImage from "../../components/Images/nullImage.png";
import { useDispatch, useSelector } from "react-redux";
import { searchArticle } from "../../store/action"; 
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { header, noFound, searching } from "../../config/config";
import { Container, Header, card } from "./index";
import ScamNewsNavBar from "../ScamNewsNavBar/ScamNewsNavBar"; 
import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Footer";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [totalArticles, setTotalArticle] = useState(0);
  const { articles, loading } = useSelector((state) => state.search);
  const { query } = useParams(); 
  const dispatch = useDispatch();

  useEffect(() => {
    if (query) {
      const country = "au"; 
      dispatch(searchArticle(query, country)); 
    }
  }, [query, dispatch]);

  useEffect(() => {
    setSearchQuery(query);
    setTotalArticle(articles?.totalArticles || 0);
  }, [query, articles]);

  const capitaLize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  document.title =
    totalArticles === 0
      ? noFound
      : loading
      ? searching
      : `${capitaLize(searchQuery)} Scam - News (${totalArticles} Articles Found)`;

  return (
    <>
      <NavBar />
      <ScamNewsNavBar />
      {loading ? (
        <Container>
          <Row>
            {Array.from({ length: 8 }).map((_, index) => (
              <Col sm={12} md={6} lg={4} xl={3} key={index}>
                <SkeletonCard /> {/* 使用骨架屏组件 */}
              </Col>
            ))}
          </Row>
        </Container>
      ) : (
        <>
          <Header>
            {totalArticles === 0 ? noFound : header(`${capitaLize(searchQuery)} Scam`)}
          </Header>
          <Container>
            <Row>
              {articles?.articles?.map((element) => (
                <Col sm={12} md={6} lg={4} xl={3} style={card} key={uuidv4()}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    published={element.publishedAt}
                    channel={element.source.name}
                    alt="News image"
                    imageUrl={element.image === null ? NullImage : element.image}
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

export default Search;

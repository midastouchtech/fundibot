import Head from "next/head";
import Navigation from "@/components/nav";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Footer from "@/components/footer";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const StyledMain = styled.main`
  height: auto;
  width: 100vw;
  background: #f4f4f4;
  padding-top: 10rem;
`;

const Container = styled.div`
  margin: 0rem 12rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  @media (max-width: 768px) {
    padding-left: 2rem;
    margin: 0rem 0rem;
  }
`;

const Card = styled.div`
  height: 250px !important;
  .card-body {
    padding: 0;
    padding-left: 1rem;
    padding-right: 0.5rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    height: 100%;
    .card-section {
      width: 100%;
      height: 45%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
    }
    .card-section-body {
      width: 100%;
      height: 35%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
    }
    .card-section-footer {
      width: 100%;
      height: 20%;

      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: start;
    }
  }
  width: 95%;

  height: auto;
  margin-top: 3rem;

  border-radius: 10px;
  box-shadow: none;
  overflow: hidden;
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: start;
  p {
    font-size: 0.75rem;
    margin-top: 0px;
    margin-right: 15px;
    margin-bottom: 5px;
    a {
      text-decoration: none;
      color: #495057;
    }
  }
  h3 {
    margin-top: 0px;
    margin-bottom: 0px;
    color: #636568;
    font-weight: 100;
    font-size: 0.8rem;
  }
  h2 {
    font-size: 1.2rem;
    margin-top: 0px;
    margin-bottom: 10px;
    font-weight: 400;
  }
`;

const Heart = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
  background: #d3d2d2a1;
  border-bottom-left-radius: 10pc;
  display: flex;
  justify-content: end;
  align-items: center;
  svg {
    margin-right: 5px;
    margin-bottom: 5px;
  }
  &:hover {
    svg {
      transform: scale(1.1);
    }
  }
`;
export const getServerSideProps = async ({ query }) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/universities?page=0`
  );

  const universities = response.data.institutions;
  const total = response.data.total;

  return {
    props: {
      universities,
      total,
    },
  };
};

export default function Home(props) {
  const [page, setPage] = useState(0);
  const [universities, setUniversities] = useState(props.universities);
  console.log("Universities", universities);
  return (
    <div>
      <Head>
        <title>
          Explore Your Educational Journey with Fundi Bot - Find the Best
          Colleges & Courses
        </title>
        <meta
          name="description"
          content="Fundi Bot is your go-to platform for discovering top universities and colleges. Explore a wide range of courses and unlock your academic potential today!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <StyledMain>
        <Container>
          <div className="row w-100">
            <div className="col-md-6">
              <h1 className="display-4">Universities </h1>
              <p className="lead">
                Fundi Bot is your go-to platform for discovering top
                universities and colleges. Explore a wide range of courses and
                unlock your academic potential today!
              </p>
            </div>
            <div className="col-md-12">
              <div className="row">
                {universities?.map((university) => (
                  <div className="col-md-12 col-xs-12 col-sm-12">
                    <div className="card my-2 p-4">
                      <Heart>
                        <AiOutlineHeart size={30} />
                      </Heart>
                      <div className="row no-gutters">
                        <div className="col-sm-5">
                          <img
                            className="card-img"
                            src={
                              university.campusImage
                                ? university.campusImage
                                : "/campus_placeholder.png"
                            }
                            alt="Suresh Dasari Card"
                          />
                        </div>
                        <div className="col-sm-7">
                          <div className="card-body">
                            <h5 className="card-title">
                              {university.institution}
                            </h5>
                            <p className="card-text">
                              {`${university.address.street}, ${university.address.city}, ${university.address.postalCode}`}{" "}
                            </p>
                            <p className="card-text">
                              <strong>Contact Number: </strong>
                              <a
                                href={`tel:${university.contact.contactNumber}`}
                              >
                                {university.contact.contactNumber}
                              </a>
                            </p>
                            <p className="card-text">
                              <strong>Email: </strong>
                              <a href={`mailto:${university.contact.email}`}>
                                {university.contact.email}
                              </a>
                            </p>
                            <p className="card-text">
                              <strong>Wesbite: </strong>
                              <a href={university.contact.website}>
                                {university.contact.website}
                              </a>
                            </p>
                            <Link
                              className="btn btn-dark"
                              href={`/universities/${university._id}`}
                            >
                              View more details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <p> </p>
          </div>
        </Container>
      </StyledMain>
      <Footer />
    </div>
  );
}

/*

                        

                        
                        */

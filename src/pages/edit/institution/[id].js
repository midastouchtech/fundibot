import { useRouter } from "next/router";
import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Fragment, useState } from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ramda from "ramda";
import provinces from "@/data/provinces.json";
import Badge from "react-bootstrap/Badge";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

const institutionTypes = ["University", "College", "Institute", "School"];

export const getServerSideProps = async ({ query }) => {
  const response = await axios.get(
    `http://localhost:3001/api/institution?id=${query.id}`
  );

  const institution = response.data;

  return {
    props: {
      institution,
    },
  };
};

export default function EditInstitutionPage(props) {
  const [institution, setInstitution] = useState(
    props.institution || {
      institution: "",
      region: "",
      address: {
        street: "",
        city: "",
        province: "",
        country: "",
        postalCode: "",
      },
      contact: {
        phone: "",
        email: "",
        website: "",
      },
      bio: "",
      logoUrl: "",
      coverImageUrl: "",
      type: "",
    }
  );

  const setDetail = (key, value) => {
    setInstitution((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };
  const doRequest = async () => {
      try {
       const response =  await axios.post(
            `${process.env.NEXT_SITE_URL}/api/edit/institution?id=${props.institution._id}`,
            institution
          )
        
        // empty all data and show success message
        setInstitution({
          institution: "",
          region: "",
          address: {
            street: "",
            city: "",
            province: "",
            country: "",
            postalCode: "",
          },
          contact: {
            phone: "",
            email: "",
            website: "",
          },
          bio: "",
          logoUrl: "",
          coverImageUrl: "",
          type: "",
          social: {
            facebookUrl: "",
            twitterUrl: "",
            instagramUrl: "",
            linkedinUrl: "",
            youtubeUrl: "",
          },
        });
        window.alert("Institution updated successfully");
      } catch (e) {
        console.log(e);
        window.alert("Something went wrong");
      }
  }
  const submit = async (e) => {
    const confirm = process.env.NEXT_PUBLIC_PASSWORD;
    let password = await prompt('Enter password', "");
    e.preventDefault();
    password === confirm ? await doRequest() : alert('Wrong password');
  };

  return (
    <>
      <Head>
        <title>Details for: {props?.institution?.institution}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Image src="/logo.png" width="200" height="100" />
          <div>Find Your Future: Explore Colleges & Courses!</div>
        </div>

        <Container className="ml-3 mr-3">
          {/* Edit Institution form */}

          <Form>
            <Row className="mt-4 d-flex flex-row justify-content-center align-items-center">
              <Col md={10} sm={12}>
                <h4>
                  <Badge bg="warning" text="dark">
                    Editing
                  </Badge>{" "}
                  {props.institution?.institution}
                </h4>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="institutionBio">
                      <Form.Label>Bio</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter bio"
                        value={institution?.bio}
                        onChange={(e) => setDetail("bio", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} xs={12}>
                    <Form.Group className="mb-3" controlId="institutionRegion">
                      <Form.Label>Region</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter region"
                        value={institution?.region}
                        onChange={(e) => setDetail("region", e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="institutionAddress">
                      <Form.Label>Street Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={institution?.address?.street}
                        onChange={(e) =>
                          setDetail("address", {
                            ...institution?.address,
                            street: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="institutionAddress">
                      <Form.Label>Suburb</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={institution?.address?.suburb}
                        onChange={(e) =>
                          setDetail("address", {
                            ...institution?.address,
                            suburb: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="institutionCity">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter city"
                        value={institution?.address?.city}
                        onChange={(e) =>
                          setDetail("address", {
                            ...institution?.address,
                            city: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="institutionProvince"
                    >
                      <Form.Label>Province</Form.Label>
                      <Form.Control
                        as="select"
                        value={institution?.address?.province}
                        onChange={(e) =>
                          setDetail("address", {
                            ...institution?.address,
                            province: e.target.value,
                          })
                        }
                      >
                        <option value="">Select a province</option>
                        {provinces.map((province) => (
                          <option key={province.code} value={province.name}>
                            {province.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="institutionCountry">
                      <Form.Label>Country</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter country"
                        value={institution?.address?.country}
                        onChange={(e) =>
                          setDetail("address", {
                            ...institution?.address,
                            country: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="institutionPostalCode"
                    >
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter postal code"
                        value={institution?.address?.postalCode}
                        onChange={(e) =>
                          setDetail("address", {
                            ...institution?.address,
                            postalCode: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} xs={12}>
                    <Form.Group className="mb-3" controlId="institutionName">
                      <Form.Label>Institution Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter institution name"
                        value={institution?.institution}
                        onChange={(e) =>
                          setDetail("institution", e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="institutionPhone">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter phone"
                        value={institution?.contact?.phone}
                        onChange={(e) =>
                          setDetail("contact", {
                            ...institution?.contact,
                            phone: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="institutionEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter email"
                        value={institution?.contact?.email}
                        onChange={(e) =>
                          setDetail("contact", {
                            ...institution?.contact,
                            email: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="institutionWebsite">
                      <Form.Label>Website</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter website"
                        value={institution?.contact?.website}
                        onChange={(e) =>
                          setDetail("contact", {
                            ...institution?.contact,
                            website: e.target.value,
                          })
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="institutionLogoUrl">
                      <Form.Label>Logo URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter logo URL"
                        value={institution?.logoUrl}
                        onChange={(e) => setDetail("logoUrl", e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="institutionCoverImageUrl"
                    >
                      <Form.Label>Cover Image URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter cover image URL"
                        value={institution?.coverImageUrl}
                        onChange={(e) =>
                          setDetail("coverImageUrl", e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="institutionVideoUrl"
                    >
                      <Form.Label>Video URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter video URL"
                        value={institution?.videoUrl}
                        onChange={(e) => setDetail("videoUrl", e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4} xs={12}>
                    <Form.Group
                      className="mb-3"
                      controlId="institutionFacebookUrl"
                    >
                      <Form.Label>Facebook URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Facebook URL"
                        value={institution?.social?.facebookUrl}
                        onChange={(e) =>
                          setDetail("social", {
                            ...institution?.social,
                            facebookUrl: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="institutionTwitterUrl"
                    >
                      <Form.Label>Twitter URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Twitter URL"
                        value={institution?.social?.twitterUrl}
                        onChange={(e) =>
                          setDetail("social", {
                            ...institution?.social,
                            twitterUrl: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="institutionInstagramUrl"
                    >
                      <Form.Label>Instagram URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Instagram URL"
                        value={institution?.social?.instagramUrl}
                        onChange={(e) =>
                          setDetail("social", {
                            ...institution?.social,
                            instagramUrl: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="institutionYoutubeUrl"
                    >
                      <Form.Label>Youtube URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Youtube URL"
                        value={institution?.social?.youtubeUrl}
                        onChange={(e) =>
                          setDetail("social", {
                            ...institution?.social,
                            youtubeUrl: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="institutionLinkedinUrl"
                    >
                      <Form.Label>Linkedin URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Linkedin URL"
                        value={institution?.social?.linkedinUrl}
                        onChange={(e) =>
                          setDetail("social", {
                            ...institution?.social,
                            linkedinUrl: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="institutionGithubUrl"
                    >
                      <Form.Label>Github URL</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Github URL"
                        value={institution?.social?.githubUrl}
                        onChange={(e) =>
                          setDetail("social", {
                            ...institution?.social,
                            githubUrl: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="institutionwhatsappNumber"
                    >
                      <Form.Label>Whatsapp Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Whatsapp Number"
                        value={institution?.social?.whatsappNumber}
                        onChange={(e) =>
                          setDetail("social", {
                            ...institution?.social,
                            whatsappNumber: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button variant="primary" type="submit" onClick={submit}>
                  Save
                </Button>
                <Button href="/" variant="secondary" className="ms-2">
                    Cancel
                </Button>
                <br />
                <br />
                <br />
                <br />
              </Col>
            </Row>
          </Form>
        </Container>
      </main>
    </>
  );
}

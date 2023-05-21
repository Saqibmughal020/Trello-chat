import React from "react";
import { Box, Link } from "@mui/material";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "../../../helpers";
import { SocialIconsData } from "./LoginMockData";
import "./Login.scss";
import LoginForm from "./LoginForm/LoginForm";
import Grid from "@mui/material/Grid";
const Login = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        px: 10,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        background: "#011339",
      }}
      className="authentication-login"
    >
      {/* <Box className="layout"></Box> */}

      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Typography
            variant="h3"
            sx={{
              fontFamily: "poppins",
              fontWeight: 500,
              color: "#fff",
              letterSpacing: "5px",
              lineHeight: "80px",
              "& span": {
                color: "#011339",
              },
            }}
            className="login-title"
          >
            Wellcome to <br />
            <span className="soccer-logo"> Trello Chat </span>
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#fff", fontFamily: "poppins", mt: 2 }}
          >
            <h1>Welcome To Chat App for Trello</h1>
            <p>Improve collaboration, software quality, and evolution with our powerful chat system
               designed specifically for developers working on the Trello platform. 
               Our chat application, built with React and WebSocket.io, provides a seamless 
              communication experience that keeps you connected with your team in real-time.</p>

          </Typography>
          <Box gap={3} className="icons" sx={{ display: "flex", pt: 4 }}>
            {SocialIconsData.map((item) => (
              <Box
                key={item.id}
                sx={{
                  width: "35px",
                  height: "35px",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                  cursor: "pointer",
                  background: "#fff",
                }}
              >
                <Link href={item.url}>
                  <img src={item.img} alt="" width={"20px"} height={"20px"} />
                </Link>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper elevation={3} sx={{ borderRadius: "20px" }}>
            <Card
              sx={{
                borderRadius: "20px",
                background: "#dae1f0",
                boxShadow: " 0px 4px 25px rgba(168, 215, 255, 0.4)",
              }}
            >
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;

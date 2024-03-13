import { Box, Container, Typography } from "@mui/material";

const Contact: React.FC = () => {
  return (
    <Box>
      <Typography>
        Email: <a href="mailto:brennenputh@cedarville.edu">brennenputh@cedarville.edu</a>
      </Typography>
    </Box>
  )
}

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h4" sx={{ mb: 2 }}>
          Brennen Puth
        </Typography>
        <Typography>
          Freshman in Computer Science at Cedarville University.
        </Typography>
      </Box>
      <Contact />
    </Container>
  )
}

export default Home;

import React from "react";
import "./Question.scss";
import { Box } from "@mui/system";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { QuestionData } from "./QuestionData";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Question = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [questionValue, setQuestionValue] = React.useState(QuestionData);
  const [searchBar, setSearchBar] = React.useState("");
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const searchHandler = (event: any) => {
    setSearchBar(event.target.value);
    const searchData =
      event.target.value !== ""
        ? QuestionData.filter((item) =>
            item.question
              .toLocaleLowerCase()
              .includes(event.target.value.toLowerCase())
          )
        : QuestionData;
    setQuestionValue(searchData);
  };
  return (
    <Box
      className="page-style frequenlty-asked-question"
      sx={{ paddingTop: 20 }}
    >
      <Box sx={{ p: 10 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontFamily: "poppins", color: "#fff" }}
          >
            Frequently Asked Question
          </Typography>
          <Box sx={{ py: 4 }}>
            <input
              value={searchBar}
              placeholder="Search"
              type="search"
              onChange={searchHandler}
            />
          </Box>
        </Box>
        <Box sx={{ borderRadius: 10, background: "#fff", p: 4 }}>
          {questionValue.map((item, index) => (
            <Accordion
              expanded={expanded === String(index)}
              onChange={handleChange(String(index))}
              key={index + 1}
              sx={{
                background: "transparent",
                boxShadow: "none",
                margin: 0,
                "&:Mui-expanded": {
                  margin: 0,
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={String(index)}
                id={String(index)}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#154128",
                    fontFamily: "poppins",
                    fontWeight: 500,
                  }}
                >
                  Question : {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{ background: "#154128", borderRadius: 4, p: 3 }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontFamily: "poppins", color: "#fff" }}
                >
                  Answer : {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Question;

import { React, useState } from "react";

//img
import Partner from "../../img/partners/partner.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// MUI
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Collapse,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import EastIcon from "@mui/icons-material/East";
import { useTranslation } from "react-i18next";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: "rotate(0deg)",
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: "rotate(180deg)",
            },
        },
    ],
}));

export default function PartnerIndividual({ partner }) {
    const { t } = useTranslation();

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ minWidth: 280, pl: 2, pr: 2 }}>
            <CardHeader
                title={t("partner-header")}
                avatar={<Avatar src={Partner} alt="Partner" />}
                sx={{ width: 200 }}
            />
            <CardMedia
                component="img"
                height={140}
                image={partner.pictureSrc}
                sx={{ height: 140, objectFit: "contain" }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {partner.companyName}
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", width: 200 }}
                >
                    {partner.companyDesc}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="Projects"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography color="success">
                        {t("partner-project")}
                    </Typography>

                    <List>
                        {partner.projects.map((project, index) => (
                            <ListItem
                                disablePadding
                                sx={{ width: 200 }}
                                key={index}
                            >
                                <ListItemIcon>
                                    <EastIcon />
                                </ListItemIcon>
                                <ListItemText primary={project} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Collapse>
        </Card>
    );
}

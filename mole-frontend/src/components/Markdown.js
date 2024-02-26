import Markdown from "markdown-to-jsx";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function({children}){
    return(
        <Markdown
            options = {{
                wrapper : 'article',
                overrides: {
                    a:{
                        component: TypographyLink,
                    },
                    img:{
                        component: NextImage
                    },
                    p: {
                        component: P,
                        props: {
                            variant: 'body1'
                        }
                    },
                    ...typographyOverides
                }
            }}
        >
            {children}
        </Markdown>
    )
}

const marginBottom = (margin = 2) => {
    return({
        sx : {
            marginBottom : `${margin}px`
        }
    });   
}

const typographyOverides = {
    h1: {
        component: Typography,
        props: {
            variant: 'h1',
            ...marginBottom(5)
        },
    },
    h2: {
            component: Typography,
            props: {
                variant: 'h2',
                ...marginBottom(4)
            },
    },
    h3: {
        component: Typography,
        props: {
            variant: 'h3',
            ...marginBottom(3)
        },
    },
    h4: {
        component: Typography,
        props: {
            variant: 'h3',
            ...marginBottom()
        },
    },
    h5: {
        component: Typography,
        props: {
            variant: 'h5',
            ...marginBottom()
        },
    },
    h6: {
        component: Typography,
        props: {
            variant: 'h6',
            ...marginBottom()
        },
    },
}

function P({children, ...props}){
    var renderList = [];
    var renderElement = [];
    children.forEach((element, idx) => {
        renderElement.push(element);
        if(element.type === NextImage){
            renderList.push(renderElement);
            renderElement = [];
        }
        if(children.length === idx+1){
            renderList.push(renderElement);
        }
    })
    return(
        <>
        {renderList.map((element, idx) =>
            <RenderP {...props} key={idx}>
                {element}
            </RenderP>
        )}
        </>
    )
}

function RenderP({children, ...props}){
    if(children.some(x => x.type === NextImage)){
        // image detected
        return(
            <Box>
                {children}
            </Box>
        );
    }
    return(
        <Typography {...props}>
            {children}
        </Typography>
    );
}

function TypographyLink({children, ...props}){
    return(
        <Typography component={Link} sx= {{color: "primary.main", textDecoration: "underline", textDecorationColor: "primary.main"}} {...props}>
            {children}
        </Typography>
    );
}

function NextImage(props){
    return(
        <Box align="center">
            <Paper sx={{ position: 'relative', height: {xs: "200px", sm: "280px", md:"350px", lg:"400px"}, maxWidth:{xs:"400px", sm:"500px", md:"600px", lg:"800px"}, marginTop: "10px", marginBottom: "10px"}}>
                <Image {...props} fill={true}  sx={{objectFit : "fill"}} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw" />
            </Paper>
        </Box>
        
    );
}
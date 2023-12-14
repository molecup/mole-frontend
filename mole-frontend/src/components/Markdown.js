import Markdown from "markdown-to-jsx";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";

export default function({children}){
    return(
        <Markdown
            options = {{
                wrapper : 'article',
                overrides: {
                    a:{
                        component: Link
                    },
                    img:{
                        component: NextImage
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
    p: {
        component: Typography,
        props: {
            variant: 'body1'
        }
    }
}

function NextImage(props){
    return(
        <div style={{ position: 'relative', height: '200px', marginTop: "10px", marginBottom: "10px"}}>
            <Image {...props} fill={true}  sx={{objectFit : "fill"}} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw" />
        </div>
    );
}
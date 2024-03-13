import LayoutHome from "@/layouts/LayoutHome";

export const metadata = {
    title: "Blog GitHub",
};

export default function ComentsLayout({children}) {

    return(
        <LayoutHome>
            {children}
        </LayoutHome>
        
    )
}
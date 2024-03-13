import SecondaryLayout from "@/layouts/SecondaryLayout";

export const metadata = {
    title: "Blog GitHub",
};

export default function ComentsLayout({children}) {

    return(
        <SecondaryLayout>
            {children}
        </SecondaryLayout>
        
    )
}
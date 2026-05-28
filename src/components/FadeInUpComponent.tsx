import { motion } from "motion/react";
import { type CSSProperties, type ReactNode } from "react";

function FadeInUpComponent({
    children,
    style,
}: {
    children: ReactNode;
    style?: CSSProperties;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={style}
        >
            {children}
        </motion.div>
    );
}

export default FadeInUpComponent;

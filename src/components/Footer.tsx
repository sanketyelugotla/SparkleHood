import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-10 text-sky-300 text-md"
        >
            Made with ❤️ by{' '}
            <a
                href="https://sanketyelugotla.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-sky-100 transition-colors underline"
            >
                Sanket
            </a>
        </motion.footer>
    );
};

export default Footer;
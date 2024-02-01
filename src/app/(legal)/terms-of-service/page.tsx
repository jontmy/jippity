export const dynamic = "force-static";

export const metadata = {
    title: "Terms of Service",
    description:
        "By accessing or using Jippity, you confirm you have read, understood, and agree to our Terms, along with our Privacy Policy.",
};

export default function Page() {
    return (
        <article className="prose dark:prose-invert py-2">
            <h1>Terms of Service</h1>
            <h2 className="text-sm text-muted-foreground">Effective as of 01 February 2024</h2>
            <p>
                Welcome to Jippity. By accessing or using our web application, you agree to be bound
                by these Terms of Service. Please read them carefully. If you do not agree with any
                part of these terms, you must not use our application.
            </p>
            <h3>1. Acceptance of Terms</h3>
            <p>
                1.1 The web application, Jippity, owned and operated by Jippity ("we," "us," or
                "our"), incorporates the use of OpenAI's GPT models for chat functionality. These
                Terms of Service ("Terms") govern your use of Jippity and any related services
                provided by us.
            </p>
            <p>
                1.2 By accessing or using Jippity, you confirm you have read, understood, and agree
                to these Terms, along with our Privacy Policy.
            </p>
            <h3>2. Age Restriction</h3>
            <p>
                2.1 Jippity is not intended for individuals under the age of 13. By using our web
                application, you represent and warrant that you are at least 13 years of age.
            </p>
            <h3>3. User Responsibilities</h3>
            <p>
                3.1 You are solely responsible for ensuring that the content you input into Jippity
                is appropriate and does not infringe upon the legal rights of others or the laws of
                your jurisdiction. Specifically, you agree not to submit, upload, or otherwise
                disseminate any content that:
            </p>
            <ul>
                <li>Is obscene, pornographic, indecent, or sexually explicit.</li>
                <li>Promotes violence or is threatening, abusive, harassing, or defamatory.</li>
                <li>Is fraudulent, deceptive, or misleading.</li>
                <li>Violates any applicable laws or regulations.</li>
                <li>Infringes on any intellectual property rights of any party.</li>
            </ul>
            <p>
                3.2 You acknowledge that Jippity cannot review all content generated through our
                application but reserves the right to remove, edit, or modify any content that
                violates these Terms or is otherwise deemed objectionable at our discretion.
            </p>
            <h3>4. Intellectual Property Rights</h3>
            <p>
                4.1 Except for the content you provide, Jippity and all materials therein, including
                software, images, text, graphics, logos, and the underlying technology, are owned by
                or licensed to us and are protected by intellectual property laws.
            </p>
            <p>
                4.2 You are granted a non-exclusive, non-transferable, revocable license to access
                and use Jippity strictly in accordance with these Terms.
            </p>
            <h3>5. No Warranty</h3>
            <p>
                5.1 Jippity and all associated services are provided on an "as is" and "as
                available" basis without any warranties, either express or implied, including, but
                not limited to, implied warranties of merchantability or fitness for a particular
                purpose.
            </p>
            <h3>6. Limitation of Liability</h3>
            <p>
                6.1 To the fullest extent permitted by law, [Your Company Name] shall not be liable
                for any indirect, incidental, special, consequential, or punitive damages, or any
                loss of profits or revenues, whether incurred directly or indirectly, or any loss of
                data, use, goodwill, or other intangible losses resulting from your access to or use
                of, or inability to access or use Jippity.
            </p>
            <h3>7. Amendment of Terms</h3>
            <p>
                7.1 We reserve the right to modify or replace these Terms at any time at our sole
                discretion. By continuing to access or use Jippity after those revisions become
                effective, you agree to be bound by the revised Terms.
            </p>
            <h3>8. Governing Law</h3>
            <p>
                8.1 These Terms shall be governed and construed in accordance with the laws of
                Singapore, without regard to its conflict of law provisions.
            </p>
            <h3>9. Contact Us</h3>
            <p>
                9.1 If you have any questions about these Terms of Service, please contact us at{" "}
                <b>jippity.app@gmail.com</b>.
            </p>
            <p>
                By using Jippity, you acknowledge that you have read, understood, and agreed to be
                bound by these Terms of Service.
            </p>
        </article>
    );
}

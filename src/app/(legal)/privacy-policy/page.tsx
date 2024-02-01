export const metadata = {
    title: "Privacy Policy",
    description:
        "Our Privacy Policy describes how your personal information is collected, used, and shared when you use Jippity.",
};

export default function Page() {
    return (
        <article className="prose dark:prose-invert py-2">
            <h1>Privacy Policy</h1>
            <h2 className="text-sm text-muted-foreground">Effective as of 01 February 2024</h2>
            <p>
                This Privacy Policy describes how your personal information is collected, used, and
                shared when you use Jippity (the "Service"), a web application that leverages
                OpenAI's GPT models for chat functionality. The use of information received through
                our Service shall be limited to the purpose of providing the Service for which the
                User has engaged with Jippity.
            </p>
            <h3>1. Information Collection And Use</h3>
            <p>
                For a better experience while using our Service, we may require you to provide us
                with certain personally identifiable information. The information that we request
                will be retained by us and used as described in this privacy policy.
            </p>
            <p>
                <b>OpenAI API Key:</b> The Service requires Users to input their personal OpenAI API
                key to access chat functionalities. Be informed that this key is not stored on
                Jippity's servers. Instead, it is stored locally on the User's device (in the
                browser storage) to ensure privacy and security.
            </p>
            <p>
                <b>OAuth Information:</b> For Users opting to sign in via an authentication
                provider, OAuth login information is stored in your browser's cookies. This
                information simplifies the sign-in process, offering a seamless user experience
                without compromising security standards.
            </p>
            <p>
                <b>Conversation History:</b> For Users signed in through an authentication provider,
                we offer the option to store conversation history on Jippity's servers. All such
                data, including messages, are encrypted to protect user privacy.
            </p>
            <h3>2. Log Data</h3>
            <p>
                We want to inform you that whenever you visit our Service, we collect information
                that your browser sends to us called Log Data. This Log Data may include information
                such as your computer's Internet Protocol ("IP") address, browser version, pages of
                our Service that you visit, the time and date of your visit, the time spent on those
                pages, and other statistics.
            </p>
            <h3>3. Cookies</h3>
            <p>
                Our website uses only functional cookies solely for the purposes of authentication.
                If you choose to refuse cookies, you may not be able to use some portions of our
                Service.
            </p>
            <h3>4. Service Providers</h3>
            <p>We may employ third-party companies and individuals due to the following reasons:</p>
            <ul>
                <li>To facilitate our Service;</li>
                <li>To provide the Service on our behalf;</li>
                <li>To perform Service-related services; or</li>
                <li>To assist us in analyzing how our Service is used.</li>
            </ul>
            <p>
                We want to inform our Service users that these third parties have access to your
                Personal Information. The reason is to perform the tasks assigned to them on our
                behalf. However, they are obligated not to disclose or use the information for any
                other purpose.
            </p>
            <h3>5. Security</h3>
            <p>
                We value your trust in providing us your Personal Information, thus we are striving
                to use commercially acceptable means of protecting it. But remember that no method
                of transmission over the internet, or method of electronic storage is 100% secure
                and reliable, and we cannot guarantee its absolute security.
            </p>
            <h3>6. Links to Other Sites</h3>
            <p>
                Our Service may contain links to other sites. If you click on a third-party link,
                you will be directed to that site. Note that these external sites are not operated
                by us. Therefore, we strongly advise you to review the Privacy Policy of these
                websites. We have no control over, and assume no responsibility for the content,
                privacy policies, or practices of any third-party sites or services.
            </p>
            <h3>7. Children's Privacy</h3>
            <p>
                Our Services do not address anyone under the age of 13. We do not knowingly collect
                personal identifiable information from children under 13. In the case we discover
                that a child under 13 has provided us with personal information, we immediately
                delete this from our servers. If you are a parent or guardian and you are aware that
                your child has provided us with personal information, please contact us so that we
                will be able to do necessary actions.
            </p>
            <h3>8. Changes to This Privacy Policy</h3>
            <p>
                We may update our Privacy Policy from time to time. Thus, we advise you to review
                this page periodically for any changes. We will notify you of any changes by posting
                the new Privacy Policy on this page. These changes are effective immediately, after
                they are posted on this page.
            </p>
            <h3>9. Contact Us</h3>
            <p>
                If you have any questions or suggestions about our Privacy Policy, do not hesitate
                to contact us at <b>jippity.app@gmail.com</b>.
            </p>
            <p>
                By using our Service, you agree to the collection and use of information in
                accordance with this policy.
            </p>
        </article>
    );
}

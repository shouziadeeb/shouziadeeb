import React from "react";
import Loader from "../Loder/Loader";

const Help = () => {
  return (
    <>
      <Loader />
      <div style={styles.container}>
        <h1 style={styles.heading}>Help & Support</h1>
        <p style={styles.subheading}>
          How can we assist you today? Browse through the topics below to find
          answers to your questions.
        </p>

        {/* Section: Order-Related Issues */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Order-Related Issues</h2>

          <div style={styles.faq}>
            <h3>1. How can I track my order?</h3>
            <p>
              To track your order, go to the "My Orders" section in your
              account. You will see real-time updates on the status of your
              order, from when it’s being prepared to when it’s out for
              delivery.
            </p>
          </div>

          <div style={styles.faq}>
            <h3>2. What should I do if my order is late?</h3>
            <p>
              If your order is delayed, please allow up to 30 minutes after the
              estimated delivery time for potential delays during peak hours.
              You can check the status in the "My Orders" section or contact our
              support team if the delay exceeds 30 minutes.
            </p>
          </div>

          <div style={styles.faq}>
            <h3>
              3. My order was incorrect or missing items, what should I do?
            </h3>
            <p>
              In case of incorrect or missing items, go to the "My Orders"
              section, click on the order, and select the "Report an Issue"
              option. Follow the prompts to get a resolution, such as a refund
              or redelivery.
            </p>
          </div>
        </div>

        {/* Section: Payment and Refunds */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Payment & Refunds</h2>

          <div style={styles.faq}>
            <h3>1. How do I update my payment method?</h3>
            <p>
              You can update your payment method by going to the "Payment
              Methods" section in your account settings. You can add new
              credit/debit cards, link a PayPal account, or choose to pay via
              digital wallets like Apple Pay and Google Pay.
            </p>
          </div>

          <div style={styles.faq}>
            <h3>2. How long does it take to process a refund?</h3>
            <p>
              Refunds are typically processed within 5-7 business days,
              depending on your payment provider. You will receive an email
              notification once the refund has been initiated.
            </p>
          </div>

          <div style={styles.faq}>
            <h3>3. Why was my payment declined?</h3>
            <p>
              Payments can be declined for several reasons, including
              insufficient funds, incorrect card details, or issues with the
              payment provider. Please double-check your information and try
              again, or contact your bank for more details.
            </p>
          </div>
        </div>

        {/* Section: Account Management */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Account Management</h2>

          <div style={styles.faq}>
            <h3>1. How do I reset my password?</h3>
            <p>
              To reset your password, click "Forgot Password" on the login page.
              You’ll receive an email with a link to reset your password. Follow
              the instructions to set up a new password.
            </p>
          </div>

          <div style={styles.faq}>
            <h3>2. How do I update my account information?</h3>
            <p>
              You can update your name, email address, phone number, and
              delivery address in the "Account Settings" section of the app.
              Remember to save your changes after editing.
            </p>
          </div>

          <div style={styles.faq}>
            <h3>3. Can I delete my account?</h3>
            <p>
              Yes, you can request to delete your account by contacting our
              support team at{" "}
              <a href="mailto:support@fooddelivery.com">
                support@fooddelivery.com
              </a>
              . Note that account deletion is permanent and cannot be undone.
            </p>
          </div>
        </div>

        {/* Section: Delivery Information */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Delivery Information</h2>

          <div style={styles.faq}>
            <h3>1. What is the delivery fee?</h3>
            <p>
              The delivery fee depends on the restaurant, the distance from the
              restaurant to your delivery address, and any ongoing promotions.
              The fee will be clearly shown at checkout.
            </p>
          </div>

          <div style={styles.faq}>
            <h3>2. Can I schedule a delivery in advance?</h3>
            <p>
              Yes, you can schedule a delivery up to 7 days in advance. When
              placing your order, select the desired date and time for delivery
              during checkout.
            </p>
          </div>

          <div style={styles.faq}>
            <h3>3. What areas do you deliver to?</h3>
            <p>
              We deliver to most areas within the city limits of our supported
              locations. You can check if delivery is available in your area by
              entering your address during the order process.
            </p>
          </div>
        </div>

        {/* Section: Promotions and Discounts */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Promotions & Discounts</h2>

          <div style={styles.faq}>
            <h3>1. How can I apply a promo code?</h3>
            <p>
              Promo codes can be applied at checkout. Enter the code in the
              "Promo Code" field, and the discount will be automatically applied
              to your order if the code is valid.
            </p>
          </div>

          <div style={styles.faq}>
            <h3>2. Where can I find ongoing promotions?</h3>
            <p>
              Ongoing promotions and discounts are displayed on the home page of
              the app. You can also sign up for our newsletter to receive
              exclusive offers and updates.
            </p>
          </div>
        </div>

        {/* Section: Contact Us */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Contact Us</h2>
          <p>If you need further assistance, feel free to contact us via:</p>
          <ul>
            <li>
              Email:{" "}
              <a href="shouziadeeb123@gmail.com">shouziadeeb123@gmail.com</a>
            </li>
            <li>Phone: +91-9756304445-FOOD-HELP (Available 24/7)</li>
            <li>
              Live Chat: Available in the app, 24/7 under the "Support" section
            </li>
          </ul>
        </div>

        {/* Section: Feedback */}
        <div style={styles.section}>
          <h2 style={styles.sectionHeading}>Feedback</h2>
          <p>
            We value your feedback! Please visit our{" "}
            <a href="/feedback">Feedback Page</a> to share your thoughts or
            report any issues.
          </p>
        </div>
      </div>
    </>
  );
};

// Basic inline styling
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  subheading: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "30px",
  },
  sectionHeading: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  faq: {
    marginBottom: "15px",
  },
};

export default Help;

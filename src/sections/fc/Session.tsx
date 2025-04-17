// SessionManagement.jsx
import { Lock, Code, Rocket } from 'lucide-react';
import CodeBlock from '../../lib/CodeBlock';

function SessionManagement() {
    const exampleCode1 = `
public class MyApp extends JoltApplication {
    public static void main(String[] args) {
        launch(MyApp.class);
    }

    @Override
    protected void init() {
        // Route to set session attributes
        get("/login", ctx -> {
            // Simulate user authentication
            Session.set(Session.IS_AUTHENTICATED_KEY, true);
            Session.set("username", "Alice");
            Session.set("role", "admin");
            return ctx.render("Welcome, " + Session.get("username") + "!");
        });

        // Route to retrieve session attributes
        get("/profile", ctx -> {
            if (Session.isAuthenticated()) {
                String username = (String) Session.get("username");
                String role = (String) Session.getOrDefault("role", "user");
                return ctx.render("Profile: " + username + ", Role: " + role);
            } else {
                ctx.status(403);
                return ctx.render("Please log in.");
            }
        });

        // Route to destroy session
        get("/logout", ctx -> {
            Session.destroy();
            return ctx.render("Logged out successfully.");
        });
    }
}
    `.trim();

    const exampleCode2 = `
# application.properties
session.lifetime=3600
    `.trim();

    return (
        <div id="session" className="bg-gray-900 text-gray-100 rounded-lg shadow-lg p-6 w-full max-w-8xl mx-auto sm:p-4">
            <div className="flex items-center mb-4">
                <Lock className="w-8 h-8 text-blue-400 mr-3" />
                <h1 className="text-3xl font-bold text-blue-400">Session Management</h1>
            </div>

            <p className="text-gray-300 mb-6">
                Jolt provides a robust session management system through the <code className="text-blue-400 bg-gray-800 px-1 rounded">Session</code> class, enabling secure storage and retrieval of user data across requests. The system includes features like IP and User-Agent validation, session expiration, and authentication tracking to ensure security and reliability.
            </p>

            <h2 className="text-xl font-semibold text-gray-200 mb-3">Key Features of Session Management</h2>
            <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                    <Code className="w-5 h-5 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">
                        Session Attributes: Store and retrieve key-value pairs using <code className="text-blue-400 bg-gray-800 px-1 rounded">Session.set()</code> and <code className="text-blue-400 bg-gray-800 px-1 rounded">Session.get()</code>.
                    </span>
                </li>
                <li className="flex items-start">
                    <Code className="w-5 h-5 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">
                        Security Checks: Validates IP address and User-Agent to prevent session hijacking, throwing exceptions like <code className="text-blue-400 bg-gray-800 px-1 rounded">SessionIpMismatchException</code>.
                    </span>
                </li>
                <li className="flex items-start">
                    <Code className="w-5 h-5 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">
                        Session Expiration: Configurable session lifetime with automatic expiration, enforced via <code className="text-blue-400 bg-gray-800 px-1 rounded">SessionExpiredException</code>.
                    </span>
                </li>
                <li className="flex items-start">
                    <Code className="w-5 h-5 text-blue-400 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-300">
                        Authentication Tracking: Track user authentication status using <code className="text-blue-400 bg-gray-800 px-1 rounded">Session.isAuthenticated()</code>.
                    </span>
                </li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-200 mb-3">Basic Session Usage</h2>
            <p className="text-gray-300 mb-4">
                The <code className="text-blue-400 bg-gray-800 px-1 rounded">Session</code> class provides methods to manage session data, such as setting attributes, retrieving values, and destroying sessions. Below is an example of a Jolt application that demonstrates session management for a simple login system.
            </p>
            <div className="mb-6">
                <p className="text-gray-300 mb-2">
                    Example: A Jolt application using session management:
                </p>
                <CodeBlock code={exampleCode1} language="js" />
            </div>
            <p className="text-gray-300 mb-4">
                Key Session methods:
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li><code className="text-blue-400 bg-gray-800 px-1 rounded">Session.set(key, value)</code>: Stores a value in the session under the specified key.</li>
                    <li><code className="text-blue-400 bg-gray-800 px-1 rounded">Session.get(key)</code>: Retrieves a value from the session by key.</li>
                    <li><code className="text-blue-400 bg-gray-800 px-1 rounded">Session.getOrDefault(key, defaultValue)</code>: Retrieves a value or returns a default if the key is not found.</li>
                    <li><code className="text-blue-400 bg-gray-800 px-1 rounded">Session.isAuthenticated()</code>: Checks if the session is marked as authenticated.</li>
                    <li><code className="text-blue-400 bg-gray-800 px-1 rounded">Session.destroy()</code>: Invalidates the session, clearing all data.</li>
                    <li><code className="text-blue-400 bg-gray-800 px-1 rounded">Session.getSessionId()</code>: Returns the unique session identifier.</li>
                </ul>
            </p>

            <h2 className="text-xl font-semibold text-gray-200 mb-3">Session Configuration</h2>
            <p className="text-gray-300 mb-4">
                Session lifetime can be configured via the <code className="text-blue-400 bg-gray-800 px-1 rounded">session.lifetime</code> property in the <code className="text-blue-400 bg-gray-800 px-1 rounded">application.properties</code> file. The default lifetime is 1800 seconds (30 minutes).
            </p>
            <div className="mb-6">
                <p className="text-gray-300 mb-2">
                    Example: Configuring session lifetime:
                </p>
                <CodeBlock code={exampleCode2} language="properties" />
            </div>
            <p className="text-gray-300 mb-4">
                Security features:
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>IP Validation: Ensures the client IP matches the session's stored IP, throwing <code className="text-blue-400 bg-gray-800 px-1 rounded">SessionIpMismatchException</code> on mismatch.</li>
                    <li>User-Agent Validation: Verifies the User-Agent matches the session's stored value, throwing <code className="text-blue-400 bg-gray-800 px-1 rounded">SessionUserAgentMismatchException</code> on mismatch.</li>
                    <li>Expiration Check: Invalidates sessions past their expiration time, throwing <code className="text-blue-400 bg-gray-800 px-1 rounded">SessionExpiredException</code>.</li>
                </ul>
            </p>

            <div className="bg-gray-800 p-4 mt-4 rounded-md flex items-start">
                <Rocket className="w-6 h-6 text-blue-400 mr-3 flex-shrink-0" />
                <div>
                    <h3 className="text-lg font-medium text-gray-100 mb-2">Next Steps</h3>
                    <p className="text-gray-400">
                        Now that you're familiar with session management, explore the{' '}
                        <a href="#security" className="text-blue-400 hover:underline">
                            Security
                        </a>{' '}
                        section to learn how to implement authentication and authorization in your Jolt application.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SessionManagement;
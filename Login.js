import React, { useState } from "react";
import { users } from "./users";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
      const [error, setError] = useState("");

        const handleLogin = (e) => {
            e.preventDefault();
                const user = users.find(
                      (u) => u.username === username && u.password === password
                          );
                              if (user) {
                                    localStorage.setItem("user", JSON.stringify(user));
                                          onLogin(user);
                                              } else {
                                                    setError("اسم المستخدم أو كلمة المرور غير صحيحة");
                                                        }
                                                          };

                                                            return (
                                                                <form onSubmit={handleLogin}>
                                                                      <input
                                                                              type="text"
                                                                                      placeholder="اسم المستخدم"
                                                                                              value={username}
                                                                                                      onChange={(e) => setUsername(e.target.value)}
                                                                                                            />
                                                                                                                  <input
                                                                                                                          type="password"
                                                                                                                                  placeholder="كلمة المرور"
                                                                                                                                          value={password}
                                                                                                                                                  onChange={(e) => setPassword(e.target.value)}
                                                                                                                                                        />
                                                                                                                                                              <button type="submit">دخول</button>
                                                                                                                                                                    {error && <div style={{ color: "red" }}>{error}</div>}
                                                                                                                                                                        </form>
                                                                                                                                                                          );
                                                                                                                                                                          }

                                                                                                                                                                          export default Login;
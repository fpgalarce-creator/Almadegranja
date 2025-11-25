export type User = {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  password: string;
  rol: "cliente" | "admin";
};

const USERS_KEY = "almadegranja_users";
const SESSION_KEY = "almadegranja_current_user";

const isBrowser = () => typeof window !== "undefined";

// Credenciales de administrador por defecto para ingresar al panel:
// email: admin@almadegranja.cl | password: Admin123
const ensureAdminUser = (users: User[]): User[] => {
  const hasAdmin = users.some((u) => u.rol === "admin");
  if (hasAdmin) return users;
  return [
    ...users,
    {
      id: crypto.randomUUID(),
      nombre: "Admin",
      email: "admin@almadegranja.cl",
      telefono: "+56911111111",
      direccion: "Casa matriz",
      password: "Admin123",
      rol: "admin",
    },
  ];
};

export const getUsers = (): User[] => {
  if (!isBrowser()) return [];
  const stored = localStorage.getItem(USERS_KEY);
  const parsed = stored ? (JSON.parse(stored) as User[]) : [];
  const withAdmin = ensureAdminUser(parsed);
  if (withAdmin.length !== parsed.length) {
    localStorage.setItem(USERS_KEY, JSON.stringify(withAdmin));
  }
  return withAdmin;
};

export const saveUsers = (users: User[]) => {
  if (!isBrowser()) return;
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const registerUser = (data: Omit<User, "id" | "rol"> & { rol?: User["rol"] }) => {
  const users = getUsers();
  const exists = users.find((u) => u.email === data.email);
  if (exists) throw new Error("Ya existe un usuario con ese email");
  const newUser: User = {
    ...data,
    id: crypto.randomUUID(),
    rol: data.rol ?? "cliente",
  };
  const updated = [...users, newUser];
  saveUsers(updated);
  setCurrentUser(newUser);
  return newUser;
};

export const loginUser = (email: string, password: string) => {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) throw new Error("Credenciales inválidas");
  setCurrentUser(user);
  return user;
};

export const setCurrentUser = (user: User | null) => {
  if (!isBrowser()) return;
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
};

export const getCurrentUser = (): User | null => {
  if (!isBrowser()) return null;
  const stored = localStorage.getItem(SESSION_KEY);
  if (stored) {
    try {
      return JSON.parse(stored) as User;
    } catch (error) {
      console.error("Error al leer sesión", error);
    }
  }
  return null;
};

export const logoutUser = () => setCurrentUser(null);

export const resetPassword = (email: string, newPassword: string) => {
  const users = getUsers();
  const user = users.find((u) => u.email === email);
  if (!user) throw new Error("No encontramos ese email");
  const updated = users.map((u) => (u.email === email ? { ...u, password: newPassword } : u));
  saveUsers(updated);
  return true;
};

export const isAdmin = (user: User | null) => user?.rol === "admin";

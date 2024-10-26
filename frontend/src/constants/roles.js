export const Roles = {
    ROLE_USER: "Пользователь",
    ROLE_ADMIN: "Администратор",
};

export function getRoleDisplayName(role) {
    return Roles[role] || "Неизвестная роль";
}

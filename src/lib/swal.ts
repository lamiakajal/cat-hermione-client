import Swal from "sweetalert2";

// SweetAlert popup styled to match whichever theme is active
export const themedSwal = () => {
  const dark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return Swal.mixin({
    background: dark ? "#0f172a" : "#ffffff",
    color: dark ? "#f8fafc" : "#0f172a",
    confirmButtonColor: "#007a5e",
    cancelButtonColor: "#64748b",
    customClass: { popup: "rounded-2xl" },
  });
};

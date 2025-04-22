document.addEventListener("DOMContentLoaded", () => {
  const walletBoxes = document.querySelectorAll(".wallet-box");

  walletBoxes.forEach((wallet) => {
    const icon = wallet.querySelector(".icon");
    const walletAddress = wallet.getAttribute("data-wallet");

    wallet.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(walletAddress);
      } catch (err) {
        console.error("Copy failed:", err);
        return;
      }

      icon.classList.remove("fa-copy");
      icon.classList.add("fa-check");

      wallet.classList.add("copied");

      wallet.style.transform = "scale(1.01)";
      wallet.style.transition = "transform 0.2s ease";

      setTimeout(() => {
        icon.classList.remove("fa-check");
        icon.classList.add("fa-copy");
        icon.style.transform = "scale(1)";
        wallet.classList.remove("copied");
        wallet.style.transform = "scale(1)";
      }, 500);
    });
  });
});

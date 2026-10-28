import styles from "./ModernizaSymbol.module.css";

/** Preserve the original raster silhouette using its alpha mask. */
export default function ModernizaSymbol({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`${styles.symbol} ${className}`} />;
}

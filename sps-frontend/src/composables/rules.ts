/**
 * rules stellt generelle Rules für die Vuetify-Validierung bereit.
 *
 * Die Texte für Validierungsfehler sind deshalb allgemein und nicht auf die
 * Felder bezogen. Im Fall, dass der Text nicht passt, kann in der Komponente
 * eine extra Rule erzeugt werden (z.B. `if (typeof RULE_MAIL(value) == 'string') {...}`).
 */
export function useRules() {
    return {
        RULE_REQUIRED: (v: any): boolean | string => {
            return !!v || "Feld ist erforderlich";
        },

        RULE_MAIL: (v: string): boolean | string => {
            return (
                !v ||
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                    v
                ) ||
                "Valide E-Mail angeben"
            );
        },
    };
}

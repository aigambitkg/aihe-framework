export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-slate-900 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">AIHE-Framework</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Ein umfassendes Bewertungs- und Steuerungsinstrument für die verantwortungsvolle Integration von KI in Organisationen.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Startseite</a></li>
              <li><a href="/framework" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Framework</a></li>
              <li><a href="/assessment" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Assessment</a></li>
              <li><a href="/documentation" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Dokumentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Ressourcen</h3>
            <ul className="space-y-2">
              <li><a href="/documentation#gewichtungslogik" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Gewichtungslogik</a></li>
              <li><a href="/documentation#berechnungsformeln" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Berechnungsformeln</a></li>
              <li><a href="/documentation#kmu-anpassungen" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">KMU-Anpassungen</a></li>
              <li><a href="/documentation#integration" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">Integrationsfähigkeiten</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Kontakt</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Haben Sie Fragen zum AIHE-Framework?
            </p>
            <a href="/contact" className="mt-2 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Kontaktieren Sie uns
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} AIHE-Framework. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}

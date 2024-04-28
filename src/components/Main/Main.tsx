import "./style.css";

interface Props {
    page: string;
}

function Main(props: Props) {
    return (
        <main>
            <div className="container">
                <h2>{props.page}</h2>
                {{
                    Hem: <RandomArticle />,
                    Tidsuppföljning: <TimeTracking />,
                    Funktioner: <RandomArticle />,
                    Om: <RandomArticle />,
                }[props.page] || <RandomArticle />}
            </div>
        </main>
    );
}

function RandomArticle() {
    return (
        <article>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quos officia ab vitae. Exercitationem natus labore, dicta aliquid ab eaque alias perspiciatis excepturi! Suscipit
                necessitatibus sint, sed eaque ipsam in? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae neque quo maiores illo, labore minima tempore veritatis quaerat
                asperiores fuga qui recusandae distinctio tempora corrupti dolorum nobis numquam, impedit ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quos officia ab vitae.
                Exercitationem natus labore, dicta aliquid ab eaque alias perspiciatis excepturi! Suscipit necessitatibus sint, sed eaque ipsam in? Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Repudiandae neque quo maiores illo, labore minima tempore veritatis quaerat asperiores fuga qui recusandae distinctio tempora corrupti dolorum nobis numquam, impedit ex?
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quos officia ab vitae. Exercitationem natus labore, dicta aliquid ab eaque alias perspiciatis excepturi! Suscipit
                necessitatibus sint, sed eaque ipsam in? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae neque quo maiores illo, labore minima tempore veritatis quaerat
                asperiores fuga qui recusandae distinctio tempora corrupti dolorum nobis numquam, impedit ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quos officia ab vitae.
                Exercitationem natus labore, dicta aliquid ab eaque alias perspiciatis excepturi! Suscipit necessitatibus sint, sed eaque ipsam in? Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Repudiandae neque quo maiores illo, labore minima tempore veritatis quaerat asperiores fuga qui recusandae distinctio tempora corrupti dolorum nobis numquam, impedit ex?
            </p>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quos officia ab vitae. Exercitationem natus labore, dicta aliquid ab eaque alias perspiciatis excepturi! Suscipit
                necessitatibus sint, sed eaque ipsam in? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae neque quo maiores illo, labore minima tempore veritatis quaerat
                asperiores fuga qui recusandae distinctio tempora corrupti dolorum nobis numquam, impedit ex? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam quos officia ab vitae.
                Exercitationem natus labore, dicta aliquid ab eaque alias perspiciatis excepturi! Suscipit necessitatibus sint, sed eaque ipsam in? Lorem ipsum dolor, sit amet consectetur adipisicing
                elit. Repudiandae neque quo maiores illo, labore minima tempore veritatis quaerat asperiores fuga qui recusandae distinctio tempora corrupti dolorum nobis numquam, impedit ex?
            </p>
        </article>
    );
}

function TimeTracking() {
    return <></>;
}

export default Main;

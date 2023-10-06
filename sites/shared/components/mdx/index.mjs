//  __SDEFILE__ - This file is a dependency for the stand-alone environment
import { Popout } from 'shared/components/popout/index.mjs'
import { Highlight } from './highlight.mjs'
import { YouTube } from './youtube.mjs'
//import { Figure } from './figure.mjs'
import { ReadMore } from './read-more.mjs'
import { Tab, Tabs } from '../tabs.mjs'
import { TabbedExample as Example } from './tabbed-example.mjs'
import { HttpMethod, HttpStatusCode } from './http.mjs'
import { ControlTip } from '../control/tip.mjs'
import { Legend } from './legend.mjs'
import { DocsTitle, DocsLink } from './docs-helpers.mjs'
import { V3Wip } from '../v3-wip.mjs'
// Extra components
import { DesignInfo } from 'shared/components/designs/info.mjs'
import { collection } from 'site/hooks/use-design.mjs'

const WipWithReadMore = (props) => (
  <>
    <V3Wip {...props} />
    <ReadMore />
  </>
)

export const components = (site = 'org', slug = []) => {
  const base = {
    Comment: (props) => <Popout {...props} comment />,
    Fixme: (props) => <Popout {...props} fixme />,
    Link: (props) => <Popout {...props} link />,
    Note: (props) => <Popout {...props} note />,
    ReadMore: (props) => <ReadMore {...props} site={site} />,
    Related: (props) => <Popout {...props} related />,
    Tab,
    Tabs,
    Tip: (props) => <Popout {...props} tip />,
    Tldr: (props) => <Popout {...props} tldr />,
    Warning: (props) => <Popout {...props} warning />,
  }
  const extra = {
    pre: (props) => <Highlight {...props} />,
    YouTube,
    // This Figure component causes hydration errors
    //img: Figure,
    table: (props) => (
      <table {...props} className="mdx-table table-auto w-full">
        {props.children}
      </table>
    ),
    ControlTip,
    Example,
    DocsTitle: (props) => <DocsTitle {...props} site={site} />,
    DocsLink: (props) => <DocsLink {...props} site={site} />,
  }

  if (site === 'sde') return base

  if (site === 'dev')
    return {
      ...base,
      ...extra,
      Method: HttpMethod,
      StatusCode: HttpStatusCode,
    }

  const specific = {}
  if (
    site === 'org' &&
    slug &&
    slug.length === 2 &&
    slug[0] === 'designs' &&
    collection.includes(slug[1])
  )
    specific.DesignInfo = DesignInfo

  return {
    ...base,
    ...extra,
    ...specific,
    //PatternDocs: WipWithReadMore,
    //PatternOptions: WipWithReadMore,
    //PatternMeasurements: WipWithReadMore,
    //Gauge: V3Wip,
    //Legend,
  }
}

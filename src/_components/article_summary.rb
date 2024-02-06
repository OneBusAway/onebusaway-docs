class ArticleSummary < Bridgetown::Component
  def initialize(title, link, date)
    @title = title
    @link = link
    @date = date
  end
end
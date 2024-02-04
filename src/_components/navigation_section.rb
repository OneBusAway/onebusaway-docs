class NavigationSection < Bridgetown::Component
  def initialize(title, children: {})
    @title = title
    @children = children
  end
end
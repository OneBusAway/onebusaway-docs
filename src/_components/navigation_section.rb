class NavigationSection < Bridgetown::Component
  def initialize(title, children: {}, current_path: nil)
    @title = title
    @children = children
    @current_path = current_path
  end
end